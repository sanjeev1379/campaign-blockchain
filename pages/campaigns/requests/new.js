import React, { useState } from "react";
import Head from 'next/head'
import {Container, Button, Form, Input, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import web3 from "../../../ethereum/web3";
import campaignInstance from "../../../ethereum/campaign";
import { Link, Router } from "../../../routes"

const AddRequests = ({address}) => {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [recipient, setRecipient] = useState('');
    const [errorMessage, setErrorMessage] =  useState('');
    const [loading, setLoading] =  useState(false);

    const onSubmit = async (event) => {
        setErrorMessage('');
        event.preventDefault();
        try {
            setLoading(true);
            const accounts = await new web3.eth.getAccounts();
            const campaign = campaignInstance(address);
            await campaign
                    .methods
                    .createRequest(
                        description,
                        web3.utils.toWei(value, 'ether'),
                        recipient
                    )
                    .send({
                        from: accounts[0]
                    });
            setLoading(false);
            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch(err) {
            setErrorMessage(err.message);
            setLoading(false);
        }

    };

    return (
        <Container>
            <Head>
                <title>Create Requests -  BlockChain</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Link route={`/campaigns/${address}/requests`}>
                <a className="">
                    <h5>Back to View Request</h5>
                </a>
            </Link>
            <h2>Create a Requests</h2>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Description </label>
                    <Input 
                        value={description}
                        onChange={(event)=> {
                            setDescription(event.target.value)
                        }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether </label>
                    <Input 
                        label="ether"
                        type="number"
                        labelPosition="right"
                        value={value}
                        onChange={(event)=> {
                            setValue(event.target.value)
                        }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient </label>
                    <Input 
                        value={recipient}
                        onChange={(event)=> {
                            setRecipient(event.target.value)
                        }}
                    />
                </Form.Field>

                <Message error header='Oops!' content={errorMessage} />

                <Button loading={loading} primary>
                    Create Request!!
                </Button>
            </Form>
        </Container>
    );
}

AddRequests.getInitialProps = async (props) => {
    let address = props?.query?.address;
    console.log(address);

    return {
        address: address
    }
}

export default AddRequests;