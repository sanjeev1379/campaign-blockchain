import React, { useState } from "react";
import Head from 'next/head'
import { Grid, Button, Form, Input, Message, Container, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

const newCampaigns = () => {
    const [minimumContribution, setMinimumContribution] =  useState('');
    const [minimumContributionError, setMinimumContributionError] =  useState(false);
    const [errorMessage, setErrorMessage] =  useState('');
    const [loading, setLoading] =  useState(false);

    const onSubmit = async (event) => {
        setMinimumContributionError(false);
        setErrorMessage('');
        event.preventDefault();
        if(minimumContribution && minimumContribution != null) {
            setLoading(true);
            try {
                const accounts = await new web3.eth.getAccounts();
                await factory
                        .methods
                        .createCampaign(minimumContribution)
                        .send({
                            from: accounts[0]
                        });
                setLoading(false);
                Router.pushRoute("/");
            } catch(err) {
                setErrorMessage(err.message);
                setLoading(false);
            }
        } else {
            setMinimumContributionError(true);
            setLoading(false);
        }

    };

    return (
        <Container>
            <Head>
                <title>Create a Campaign -  BlockChain</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Grid.Column>
                <h2>Create a Campaign</h2>
                <Form success onSubmit={onSubmit} error={!!errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution </label>
                        <Input 
                            label='wei' 
                            type="number"
                            labelPosition="right"
                            value={minimumContribution}
                            onChange={(event) => {
                                setMinimumContributionError(false);
                                setMinimumContribution(event.target.value)
                            }}
                        />
                    </Form.Field>

                    <Message error header='Oops!' content={errorMessage} />
                    {minimumContributionError && <Message floating>Please Enter Minimum Contribution!!</Message>}

                    <Button loading={loading} primary>
                        Create!!
                    </Button>
                </Form>
            </Grid.Column>
        </Container>
    );
}

export default newCampaigns;