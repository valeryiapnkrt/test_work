import React from "react";
import  './index.sass';
import {Table, Header, Grid} from 'semantic-ui-react';
import withStore from "@helpers/hocs/withStore";
import ContentEditable from 'react-contenteditable'
import Loader from '@components/Loader'
import Add from "./addContact";

let route = null;
let user = null;
class Contacts extends React.Component {

  constructor(props) {
    super(props);
    document.title = 'Список контактов';
    this.state = {};
    route = this.props.stores.routingStore;
    user = this.props.stores.user;
    user.getContacts();
  }

  handleContentEditable = (e, el) => {
    const {
      currentTarget: {
        dataset: { column },
      },
      target: { value },
    } = e
    const data = (column === "phone") ? {phone: value, name: el.name, eMale: el.eMale}
               : (column === "name") ? {name: value, phone: el.phone, eMale: el.eMale}
               : {eMale: value, phone: el.phone, name: el.name}
    const id = el._id || el.id;
    user.saveContact(id, data)
  }

  deleteAccount = (e, el) => {
    const confirmed = window.confirm(	`Удалить контакт ${el.name}?`);
    if (confirmed) {
      user.deleteContact(el._id);
    }
  };

  render() {
    const data = user.contacts;

    return (
      <>
        <Header as='h1' dividing textAlign='center'>
          Список контактов
        </Header>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={11} >
              <Add/>
              <Table selectable celled size='small' className='tshdw'>
                <Table.Header >
                  <Table.Row>
                    <Table.HeaderCell width={3}>ФИО</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Номер</Table.HeaderCell>
                    <Table.HeaderCell width={3}>E-male</Table.HeaderCell>
                    <Table.HeaderCell width={1}></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {data.map((el,i) =>
                    <Table.Row key={i}>
                      <Table.Cell>
                        <ContentEditable
                          html={el.name || ''}
                          data-column="name"
                          className="content-editable"
                          onChange={e => this.handleContentEditable(e, el)}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <ContentEditable
                          html={el.phone || ''}
                          data-column="phone"
                          className="content-editable"
                          onChange={e => this.handleContentEditable(e, el)}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <ContentEditable
                          html={el.eMale || ''}
                          data-column="eMale"
                          className="content-editable"
                          onChange={e => this.handleContentEditable(e, el)}
                        />
                      </Table.Cell>
                      <Table.Cell icon='user delete' data-tag={i} onClick={e => this.deleteAccount(e, el)}/>
                    </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell/>
                    <Table.HeaderCell/>
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}

export default withStore(Contacts);
