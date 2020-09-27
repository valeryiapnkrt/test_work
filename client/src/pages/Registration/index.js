import React from 'react';
import './index.sass';
import { Button, Form, Grid, Header, Icon} from 'semantic-ui-react';
import withStore from '@helpers/hocs/withStore';

let auth = null;
let route = null;
class Registration extends React.Component {
  constructor(props) {
    super(props);
    document.title = 'Регистрация';
    this.state = {
      login: '',
      password: ''
    }
    route = this.props.stores.routingStore;
    auth = this.props.stores.auth;
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name] : value });
  };

  handleClick = async () => {
    try {
      await auth.register(this.state);
      const status = auth.status;
      if (status === 1) {
        setTimeout(this.goBack, 1000)
      }
    } catch(e) {
    }
 };

  goBack = () => {
    route.push('/login')
  }

  render() {
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column className="AuthColumn" verticalAlign="middle">
            <Header>
              <Icon onClick={this.goBack} name='arrow left' size='large' className='arrowIcon' />
              Создать учетную запись </Header>
            <Form>
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
                <Button onClick={this.handleClick} fluid>Зарегистироваться</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};

export default withStore(Registration);