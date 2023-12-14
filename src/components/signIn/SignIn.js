import React from 'react'
import './SignIn.css'

class SignIn extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) =>{
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () =>{
        fetch('https://obscure-oasis-20536.herokuapp.com/signIn', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
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
        const { onRouteChange } = this.props;
        return(
            <article className="br3 ba white b--white mv5 w-100 w-50-m w-25-l mw6 shadow center">
                <main className="pa4 black-80">
                  <div className="measure white">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                      <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                      <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input
                            onChange={this.onEmailChange}
                            className="br3 pa2 input-reset ba bg-transparent white hover-bg-white hover-black w-100" type="email"
                            name="email-address"
                            id="email-address"
                        />
                      </div>
                      <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input
                            onChange={this.onPasswordChange}
                            className="br3 b pa2 input-reset ba bg-transparent white hover-bg-white hover-black w-100" type="password"
                            name="password"
                            id="password"
                        />
                      </div>
                    </fieldset>
                    <div className="">
                      <input
                          onClick = {this.onSubmitSignIn}
                          className="ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white hover-bg-white hover-black hover-b"
                          type="submit"
                          value="Sign in"
                      />
                    </div>
                    <div className="lh-copy mt3">
                      <p
                          onClick = {() => onRouteChange('register')}
                          className="f6 link dim white db center">
                          Register
                      </p>
                    </div>
                  </div>
                </main>
            </article>
        );
    }
}

export default SignIn;
