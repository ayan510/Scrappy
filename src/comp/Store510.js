// src/comp/Store.js

import React, { useState } from 'react';
import { Card, Image, Header, Segment, Modal, Icon } from 'semantic-ui-react';
import books from '../assets/books.jpg';
import stock2025june from '../assets/stock2025june.jpg';
import iron from '../assets/iron.jpg';
import newspaper from '../assets/newspaper.jpg';
import inchpipe from '../assets/2inchpipe.jpg';

export default function Store() {
  const items = [
    { id: 1, title: 'Pipes', img: stock2025june },
    { id: 2, title: 'Spare', img: iron },
    { id: 3, title: 'Books', img: books },
    { id: 4, title: 'Newspaper', img: newspaper },
    { id: 5, title: 'Pipe (2Inch)', img: inchpipe },
  ];

  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <Segment padded='very' style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Header as="h2" textAlign="center" color="teal" style={{ marginBottom: '30px' }}>
        🏪 Items Available in Store
      </Header>
      <h2 style={{ textAlign: 'center' }}>Click to open Image</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
        }}
      >
        {items.map((item) => (
          <Card key={item.id} raised onClick={() => setSelectedImg(item.img)} style={{ cursor: 'pointer' }}>
            <div style={{ height: '200px', overflow: 'hidden' }}>
              <Image
                src={item.img}
                wrapped
                ui={false}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <Card.Content textAlign="center">
              <Card.Header>{item.title}</Card.Header>
              <Card.Description>Available now in store</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </div>

      <Modal open={!!selectedImg} onClose={() => setSelectedImg(null)} size='large' basic>
        <Modal.Content>
          <Image
            src={selectedImg}
            centered
            style={{ maxHeight: '80vh', objectFit: 'contain' }}
          />
        </Modal.Content>
        <Modal.Actions>
          <Icon
            name='close'
            size='large'
            color='grey'
            onClick={() => setSelectedImg(null)}
            style={{ cursor: 'pointer', position: 'absolute', top: 20, right: 20 }}
          />
        </Modal.Actions>
      </Modal>
    </Segment>
  );
}
