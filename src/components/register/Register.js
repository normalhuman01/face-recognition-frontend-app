import React from 'react';

class Register extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: '',
            name: ''
        }
    }

    onEmailChange = (event) =>{
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({password: event.target.value});
    }

    onNameChange = (event) =>{
        this.setState({name: event.target.value});
    }

    onSubmitRegister = () =>{
        fetch('https://obscure-oasis-20536.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password,
                email: this.state.email,
            })
        })
        .then(response => response.json())
        .then(user =>{
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }


    render(){
        return(
            <article className="br3 ba white b--white mv5 w-100 w-50-m w-25-l mw6 shadow center">
                <main className="pa4 black-80">
                  <div className="measure white">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                      <legend className="f3 fw6 ph0 mh0">Register</legend>
                      <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                        <input
                            onChange={this.onNameChange}
                            className="br3 pa2 input-reset ba bg-transparent white hover-bg-white hover-black w-100"
                            type="text"
                            name="username"
                            id="username"
                        />
                      </div>
                      <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input
                            onChange={this.onEmailChange}
                            className="br3 pa2 input-reset ba bg-transparent white hover-bg-white hover-black w-100"
                            type="email"
                            name="email-address"
                            id="email-address"/>
                      </div>
                      <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input
                            onChange={this.onPasswordChange}
                            className="br3 b pa2 input-reset ba bg-transparent white hover-bg-white hover-black w-100"
                            type="password"
                            name="password"
                            id="password"/>
                      </div>
                    </fieldset>
                    <div className="">
                      <input
                          onClick = {this.onSubmitRegister}
                          className="ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white hover-bg-white hover-black hover-b"
                          type="submit"
                          value="Register"
                      />
                    </div>
                  </div>
                </main>
            </article>
        );
    }
}

export default Register;
