import React from 'react';
import'./index.sass' ;
import withStore from '@helpers/hocs/withStore';
import { Modal, Button, Form, Grid, Icon, Message} from 'semantic-ui-react';

let route = null;
let user = null;
class Add extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      eMale: '',
      showNotification: false,
      showModal: false
    }
    route = this.props.stores.routingStore;
    user = this.props.stores.user;
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name] : value });
  };

  addContact = () => {
    const { name, phone, eMale } = this.state;
    const element = { name, phone, eMale };
    if (name === '') {
      this.setState({showNotification: true})
    } else {
      user.addContact(element);
      route.push('/dashboard/contacts')
      this.closeModal()
    }
  };
  closeModal = () => {
    this.setState({showModal: false, showNotification: false, name: '', phone: '', eMale: ''})}

  showModal = (dimmer) => {this.setState({showModal: true, dimmer})}


  render() {

    const { name, eMale, phone, dimmer, showModal } = this.state;

    return(
      <>
          <Modal dimmer={dimmer}
                 size="tiny"
                 open={showModal}
                 onClose={this.closeModal}
                 trigger={<Icon name='add' size='large' className='addBtn'
                                onClick={() =>this.showModal('blurring')}/>}
                 closeIcon>
            <Modal.Content>
              {this.state.showNotification ?
                <Message>
                  <h3 style={{color: '#8B0000'}}>Не переданы данные</h3>
                </Message> : null
              }
              <Grid verticalAlign='middle' columns={1}>
                <Grid.Column>
                  <Form>
                    <Form.Input
                      fluid
                      className='input'
                      label='ФИО'
                      labelPosition='left'
                      placeholder='ФИО'
                      name='name'
                      value={name}
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      fluid
                      className='input'
                      label='Номер'
                      labelPosition='left'
                      placeholder='Номер'
                      name='phone'
                      value={phone}
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      fluid
                      label='eMale'
                      labelPosition='left'
                      placeholder='eMale'
                      name='eMale'
                      value={eMale}
                      onChange={this.handleChange}
                    />
                    <Button color='grey' onClick={this.closeModal}>Назад</Button>
                    <Button color='black' floated='right' onClick={this.addContact}>Добавить</Button>
                  </Form>
                </Grid.Column>
              </Grid>
            </Modal.Content>
          </Modal>
      </>
    )
  }
}

export default withStore(Add);
