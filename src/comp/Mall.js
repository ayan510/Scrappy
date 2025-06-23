import React from 'react';
import { Card, Image, Grid } from 'semantic-ui-react';

export default function Mall({ products = [] }) {
  return (
    <Grid columns={2} stackable doubling>
      {products.map((p) => (
        <Grid.Column key={p.id}>
          <Card fluid>
            <Image src={p.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{p.name}</Card.Header>
              <Card.Meta>{p.price}</Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
    </Grid>
  );
}
