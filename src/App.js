import React, { createContext, useEffect, useState } from 'react';
import { auth } from './comp/firebase';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Home from './comp/Home';
import Products from './comp/Products';
import History from './comp/History';
import Mall from './comp/Mall';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import {
  Button, Icon, Image, Menu, Modal, Sidebar, Segment, Form, Input
} from 'semantic-ui-react';

import ironImg from './assets/iron.jpg';
import plasticImg from './assets/plastic.jpg';
import booksImg from './assets/books.jpg';
import newspaperImg from './assets/newspaper.jpg';
import cardboardImg from './assets/cardboard.jpg';
import steelImg from './assets/steel.jpg';

export const MyContext = createContext(null);

export default function App() {
  const [params, setParams] = useState({ page: 'Home' });
  const [user, setUser] = useState(null);
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [admins, setAdmins] = useState(['smdabdulla510@gmail.com']);

  const [products, setProducts] = useState([
    { id: 1, name: 'Iron', price: '₹500', image: ironImg },
    { id: 2, name: 'Plastic', price: '₹700', image: plasticImg },
    { id: 3, name: 'Books', price: '₹1200', image: booksImg },
    { id: 4, name: 'Newspaper', price: '₹300', image: newspaperImg },
    { id: 5, name: 'Cardboard', price: '₹900', image: cardboardImg },
    { id: 6, name: 'Steel', price: '₹1500', image: steelImg }
  ]);

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsub1 = onAuthStateChanged(auth, setUser);
    const unsub2 = onIdTokenChanged(auth, setUser);
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const doLogin = () => {
    signInWithPopup(auth, provider).then(result => {
      setUser(result.user);
    }).catch(console.log);
  };

  const doLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setLogoutConfirmationOpen(false);
      setSidebarVisible(false);
    }).catch(console.log);
  };

  const addAdmin = () => {
    if (adminEmail && !admins.includes(adminEmail)) {
      setAdmins([...admins, adminEmail]);
      setAdminEmail('');
      setAdminModalOpen(false);
    }
  };

  return (
    <div style={{ marginTop: '20px', marginLeft: '20px' }}>
      <MyContext.Provider value={{ user, setUser, params, setParams, doLogin, admins }}>
        <Sidebar.Pushable as='div'>
          <Sidebar as={Menu} animation='overlay' onHide={() => setSidebarVisible(false)} vertical visible={sidebarVisible} width='thin' style={{ backgroundColor: darkTheme ? '#333' : '#f5f5f5' }}>
            {user ? (
              <Menu.Item onClick={() => setUserModalOpen(true)}>
                <Image src={user.photoURL} avatar />
                <br />{user.displayName}
              </Menu.Item>
            ) : (
              <Menu.Item onClick={doLogin}>
                <Icon name='sign-in' /> Login
              </Menu.Item>
            )}
            <Menu.Item onClick={() => { setParams({ page: 'Home' }); setSidebarVisible(false); }}>
              <Icon name='home' /> Home
            </Menu.Item>
            <Menu.Item onClick={() => { setParams({ page: 'Products' }); setSidebarVisible(false); }}>
              <Icon name='cart' /> Products
            </Menu.Item>
            <Menu.Item onClick={() => { setParams({ page: 'History' }); setSidebarVisible(false); }}>
              <Icon name='user' /> My Accounts
            </Menu.Item>
            <Menu.Item onClick={() => { setParams({ page: 'Mall' }); setSidebarVisible(false); }}>
              <Icon name='shopping bag' /> Mall
            </Menu.Item>
            {user && admins.includes(user.email) && (
              <Menu.Item onClick={() => setAdminModalOpen(true)}>
                <Icon name='user plus' /> Add Admin
              </Menu.Item>
            )}
            {user && (
              <Menu.Item onClick={() => setLogoutConfirmationOpen(true)}>
                <Icon name='sign-out' /> Logout
              </Menu.Item>
            )}
            <Menu.Item onClick={() => setDarkTheme(prev => !prev)}>
              <Icon name={darkTheme ? 'sun' : 'moon'} /> {darkTheme ? 'Light' : 'Dark'} Theme
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button icon onClick={() => setSidebarVisible(true)}>
                  <Icon name='bars' />
                </Button>
                {user && (
                  <Button color='red' onClick={() => setLogoutConfirmationOpen(true)}>
                    <Icon name='sign-out' /> Logout
                  </Button>
                )}
              </div>

              <Menu secondary fluid>
                <Menu.Item>
                  <Button color='purple' onClick={() => setParams({ page: 'Home' })}>
                    <Icon name='home' /> Home
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='yellow' onClick={() => setParams({ page: 'Products' })}>
                    <Icon name='opencart' /> Item
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='green' onClick={() => setParams({ page: 'History' })}>
                    <Icon name='user' /> Price
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='blue' onClick={() => setParams({ page: 'Mall' })}>
                    <Icon name='shopping bag' /> Mall
                  </Button>
                </Menu.Item>
              </Menu>

              <div className={darkTheme ? 'dark' : 'light'}>
                {params.page === 'Home' && <Home />}
                {params.page === 'Products' && <Products products={products} setProducts={setProducts} />}
                {params.page === 'History' && <History />}
                {params.page === 'Mall' && <Mall products={products} />}
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        {/* User Modal */}
        {user && (
          <Modal open={userModalOpen} onClose={() => setUserModalOpen(false)} size='tiny'>
            <Modal.Header>SCRAPPY</Modal.Header>
            <Modal.Content>
              <p>Hello, {user?.displayName}</p>
              <p>"Sell your scrap with ease – get the best price instantly through Scrappy!"</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setUserModalOpen(false)}>Close</Button>
            </Modal.Actions>
          </Modal>
        )}

        {/* Logout Modal */}
        <Modal open={logoutConfirmationOpen} onClose={() => setLogoutConfirmationOpen(false)} size='tiny'>
          <Modal.Header>Logout Confirmation</Modal.Header>
          <Modal.Content><p>Are you sure you want to logout?</p></Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={doLogout}>Yes</Button>
            <Button onClick={() => setLogoutConfirmationOpen(false)}>No</Button>
          </Modal.Actions>
        </Modal>

        {/* Admin Add Modal */}
        <Modal open={adminModalOpen} onClose={() => setAdminModalOpen(false)} size='tiny'>
          <Modal.Header>Add Admin</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Admin Email</label>
                <Input value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setAdminModalOpen(false)}>Cancel</Button>
            <Button color='green' onClick={addAdmin}>Add</Button>
          </Modal.Actions>
        </Modal>
      </MyContext.Provider>
    </div>
  );
}