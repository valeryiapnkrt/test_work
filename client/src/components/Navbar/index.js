import React, {useState} from 'react';
import withStore from '../../helpers/hocs/withStore';
import {  Menu, Button } from 'semantic-ui-react'
import './index.sass';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';


const Header = props => {
	const {role} = props;

	const { auth } = props.stores;
	// const route = props.stores.routingStore;

	const logOut = () => {
		auth.logout();
	};

	if (!role) return null;

	return (
		<nav className='Navbar'>
			<Menu pointing>
				<Menu.Menu position='right'>
					<Menu.Item className='logOut' onClick={logOut}>
						<Icon name='log out'/>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		</nav>
	);
};

export default withStore(Header);

