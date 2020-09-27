import React from 'react';
import './index.sass';
import {Button, Form, Grid, Segment} from 'semantic-ui-react';
import withStore from '@helpers/hocs/withStore';

let auth = null;
let route = null;
class Authorization
  extends React.Component {
  constructor(props) {
    super(props);
    document.title = 'Авторизация';
    this.state = {
      login: '',
      password: ''
    }
    auth = this.props.stores.auth;
    route = this.props.stores.routingStore;
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name] : value });
  };

   handleClick = () => {
     auth.login(this.state);
   };

   signIn = () => {
     route.push('/reg')
   }

   render() {

     return (
       <Grid centered>
         <Grid.Row>
           <Grid.Column className="AuthColumn" verticalAlign="middle">
             <Form>
               <Segment raised className='segment'>
                 <Form.Input
                   fluid
                   size='large'
                   icon='user'
                   iconPosition='left'
                   placeholder='Логин'
                   labelPosition='left'
                   label='Логин'
                   className='input'
                   name='login'
                   value={this.state.login}
                   onChange={this.handleChange}
                 />
                 <Form.Input
                   label='Пароль'
                   labelPosition='left'
                   fluid
                   size='large'
                   icon="lock"
                   iconPosition='left'
                   placeholder='Пароль'
                   className='input'
                   name='password'
                   value={this.state.password}
                   onChange={this.handleChange}
                 />
                 <Button onClick={this.handleClick} size='medium' fluid color='black'>
                   Войти
                 </Button>
                 <p onClick={this.signIn} className='reg'> Зарегистрироваться </p>
               </Segment>
             </Form>
           </Grid.Column>
         </Grid.Row>
       </Grid>
     );
   }
};

export default withStore(Authorization);
