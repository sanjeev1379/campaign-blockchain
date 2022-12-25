import React, { useState } from "react";
import Head from 'next/head'
import { Grid, Container, Card, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import campaignInstance from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes"

const DetailCampaigns = ({ minimumContribution, balance, requestsCount, approversCount, manager, address }) => {


    const renderCard = () => {
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manger Created this Campaign and created request for withdraw money.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minium Contributation (Wei)',
                description: 'You must contrubute this much amount for Campaign.'
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from contract, request must be approve by approvers.'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of pepolr who has already donated for this campaign.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend.'
            }
        ];

        return <Card.Group items={items} />
    }

    return (
        <Container>
            <Head>
                <title>Campaign Details -  BlockChain</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Grid.Column>
                <h2>Campaign Details</h2>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {renderCard()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${address}/requests`}>
                                <a className="">
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
        </Container>
    );
}

DetailCampaigns.getInitialProps = async (props) => {
    let address = props?.query?.address;

    const campaign = campaignInstance(address);
    const summary = await campaign.methods.getSummary().call();

    return { 
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
        address: address
    };
}

export default DetailCampaigns;