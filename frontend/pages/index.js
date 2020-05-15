import React from 'react'
import Layout from '../components/layout'
import Head from 'next/head'
import Grid from '@material-ui/core/Grid';
import Menu from '../components/menu';
import SinglePost from '../components/singlePost';

const Index = (props) => (
  <Layout {...props}>
    <Head>
      <title>9GAG: Go Fun The World</title>
    </Head>
    <br />
    <br />
    <Grid container spacing = {3}>
        <Grid item xs={4} sm={3}>
        <Menu/>
        </Grid>
        <Grid item xs={9} sm={6}>
          <SinglePost />
        </Grid>
        
      </Grid>
  </Layout>
)

export default Index