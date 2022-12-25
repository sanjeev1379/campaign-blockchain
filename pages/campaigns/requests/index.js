import React, { useState } from "react";
import Head from 'next/head'
import { Grid, Container, Button, Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import campaignInstance from "../../../ethereum/campaign";
import { Link } from "../../../routes"
import RequestRow from '../../../components/RequestRow'

const IndexRequests = ({address, requestCount, requests, approversCount}) => {
    
    const renderRequestRow = () => {
        return requests.map((request, index) => {
            return (
                <RequestRow
                    key={index}
                    id={index}
                    request={request}
                    address={address} 
                    approversCount={approversCount}
                />
            )
        })
    }

    return (
        <Container>
            <Head>
                <title>View Campaign Requests -  BlockChain</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Grid.Column>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            <h2>View Requests</h2>
                        </Grid.Column>
                        <Grid.Column width={3} textAlign="right">
                            <Link route={`/campaigns/${address}/requests/new`}>
                                <a className="">
                                    <Button primary>Add Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Amount</Table.HeaderCell>
                                    <Table.HeaderCell>Recipient</Table.HeaderCell>
                                    <Table.HeaderCell>Approval Count</Table.HeaderCell>
                                    <Table.HeaderCell>Approve</Table.HeaderCell>
                                    <Table.HeaderCell>Finalize</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {renderRequestRow()}
                            </Table.Body>
                        </Table>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <h5>found {requestCount} requests</h5>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>

        </Container>
    );
}

IndexRequests.getInitialProps = async (props) => {
    let address = props?.query?.address;

    const campaign = campaignInstance(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
        Array(parseInt(requestCount))
            .fill()
            .map((element, index) => {
                return campaign.methods.requests(index).call();
            })
    );


    return {
        address: address,
        requestCount: requestCount,
        requests: requests,
        approversCount: approversCount
    }
}

export default IndexRequests;