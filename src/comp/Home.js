import React, { useState, useEffect } from 'react';
import { Card, Grid, Segment, Header, Icon, Container } from 'semantic-ui-react';

export default function Home() {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container style={{ marginTop: '60px', padding: '10px' }}>
      {showImage ? (
        <img
          src="./scrappylogo.png"
          alt="Loading"
          style={{
            display: 'block',
            width: '60%',
            maxWidth: '250px',
            margin: '0 auto',
          }}
        />
      ) : (
        <Grid centered stackable>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={10} computer={8}>
              <Card fluid style={{ boxShadow: '0 0 10px rgba(0,0,0,0.2)', borderRadius: '20px' }}>
                <Card.Content>
                  <Card.Header style={{ color: 'green', marginBottom: '10px' }}>
                    <Icon name="recycle" /> Welcome to Scrappy
                  </Card.Header>
                  <Card.Description style={{ color: '#555' }}>
                    "<strong>ABDULLA TRADING COMPANY</strong> is your trusted scrap shop, helping you sell recyclable items like <strong>Iron, Plastic, Books, Newspaper, and Cardboard Sheets</strong>. Earn by selling your waste responsibly while contributing to a greener planet."
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2} stackable>
            {[
              { name: 'Iron', icon: 'cogs' },
              { name: 'Plastic', icon: 'flask' },
              { name: 'Books', icon: 'book' },
              { name: 'Newspaper', icon: 'newspaper' },
              { name: 'Cardboard', icon: 'box' }
            ].map((item, index) => (
              <Grid.Column key={index} mobile={8} tablet={4} computer={3}>
                <Segment
                  padded
                  textAlign="center"
                  style={{
                    cursor: 'pointer',
                    transition: '0.3s',
                    borderRadius: '15px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    marginBottom: '20px'
                  }}
                >
                  <Icon name={item.icon} size='large' color='blue' />
                  <Header as='h4' style={{ marginTop: '10px' }}>{item.name}</Header>
                </Segment>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      )}
    </Container>
  );
}
