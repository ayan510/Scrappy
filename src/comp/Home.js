import React, { useState, useEffect } from 'react';
import { Card, Grid, Segment, Image, Header, Icon } from 'semantic-ui-react';

export default function Home() {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ marginTop: '100px' }}>
      {showImage ? (
        <img
          src="./scrappylogo.png"
          alt="Loading"
          style={{ display: 'block', width: '200px', margin: '0 auto' }}
        />
      ) : (
        <Grid className='ui celled unstackable table' centered style={{ marginTop: '50px', borderRadius: '10px' }}>
          <Grid.Row>
            <Card style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)', borderRadius: '20px', margin: '20px' }}>
              <Card.Content>
                <Card.Header style={{ color: 'green', marginBottom: '10px' }}>
                  <Icon name="recycle" /> Welcome to Scrappy
                </Card.Header>
                <Card.Description style={{ color: '#555' }}>
                  "<strong ST>ABDULLA TRADING COMPANY</strong> is your trusted scrap shop, helping you sell recyclable items like <strong>Iron, Plastic, Books, Newspaper, and Cardboard Sheets</strong>. Earn by selling your waste responsibly while contributing to a greener planet."
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Row>

          <Grid.Row columns={3}>
            {[
              { name: 'Iron', icon: 'cogs' },
              { name: 'Plastic', icon: 'flask' },
              { name: 'Books', icon: 'book' },
              { name: 'Newspaper', icon: 'newspaper' },
              { name: 'Cardboard', icon: 'box' }
            ].map((item, index) => (
              <Grid.Column key={index} style={{ marginBottom: '20px' }}>
                <Segment padded style={{ textAlign: 'center', cursor: 'pointer', transition: '0.3s', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                  <Icon name={item.icon} size='huge' color='blue' />
                  <Header as='h3' style={{ marginTop: '10px' }}>{item.name}</Header>
                </Segment>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      )}
    </div>
  );
}
