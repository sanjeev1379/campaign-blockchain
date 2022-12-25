import React, { useEffect } from "react";
import Head from 'next/head'
import { Card, Button, Divider, Grid, Segment, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import factory from '../ethereum/factory';
import { Link } from "../routes";

const IndexCampaign = ({campaigns}) => {

    const renderCampaigns = () => {
        const items = campaigns.map((address) => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a className="">View Campaign</a>
                    </Link>
                ),
                fluid: true
            }
        });

        return <Card.Group items={items} />;
    }

    return (
        <Container>
            <Head>
                <title>Open Campaign -  BlockChain</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Segment>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                        <h2>Open Campaign</h2>
                        {renderCampaigns()}
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle'>
                        <Link route='/campaigns/new'>
                            <a className="">
                                <Button
                                    content="Create Campaign"
                                    icon="add circle"
                                    primary={true}
                                />
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </Segment>
        </Container>
    );

}

IndexCampaign.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaign().call();
    return { campaigns };
}

export default IndexCampaign;