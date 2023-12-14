import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import './App.css';

const particlesOptions = {
    particles: {
        "number": {
            "value": 120,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "shape": {
            "type": "circle",
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#5b5b5b",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
        }
    }
}

const initialState = {
    input : '',
    imageUrl: '',
    box: {},
    route: 'signIn',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component{
    constructor(){
        super();
        this.state =  initialState;
    }

    loadUser = (data) =>{
        this.setState({
            user:{
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    calculateFaceLocation = (data) =>{
        console.log(data);
        const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);

        return{
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    calculateFacesLocations = (data) => {
        const regions = data.outputs[0].data.regions;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        let faces = [];
        regions.forEach(element => {
            const clarifaiFace = element.region_info.bounding_box;
            const box = {
                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - (clarifaiFace.right_col * width),
                bottomRow: height - (clarifaiFace.bottom_row * height)
            }
            faces.push(box);
        });
        this.displayBox(faces);
    }

    displayBox = (box) =>{
        console.log(box);
        this.setState({box : box});
    }

    onInputChange = (event) =>{
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () =>{
        this.setState({imageUrl: this.state.input});
        // app.models
        // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        fetch('https://obscure-oasis-20536.herokuapp.com/imageUrl',{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                input: this.state.input,
            })
        })
        .then(response => response.json())
        .then(response =>{
            if(response){
                fetch('https://obscure-oasis-20536.herokuapp.com/image',{
                    method: 'put',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id,
                    })
                })
                .then(response => response.json())
                .then(count =>{
                    this.setState(Object.assign(this.state.user, {entries: count}))
                })
                .catch(console.log);
            }
            this.calculateFacesLocations(response);
        })
        .catch(err => console.log(err));
    }

    onRouteChange = (route) =>{
        if(route === 'signIn' || route === 'register')
            this.setState(initialState);
        else if(route === 'home')
            this.setState({isSignedIn: true});
        this.setState({route: route});
    }

    render(){
        const { imageUrl, box, route, isSignedIn } = this.state;
        return(
            <div className="App">
                <Particles className='particles' params={particlesOptions} />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {route === 'signIn' ?
                    <div>
                        <Logo />
                        <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                    </div>
                    : (route === 'register' ?
                        <div>
                            <Logo />
                            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                        </div>
                        :
                        <div>
                            <Logo />
                            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                            <ImageLinkForm
                                onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                            <FaceRecognition imageUrl={imageUrl} box={box} />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default App;
