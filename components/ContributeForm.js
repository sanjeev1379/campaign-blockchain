import React, { useState } from "react";
import { Button, Form, Input, Message, Container, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import factory from '../ethereum/factory';
import web3 from "../ethereum/web3";
import { Router } from "../routes";
import campaignInstance from "../ethereum/campaign";

const ContributeForm = (props) => {
    const [amountContribution, setAmountContribution] =  useState('');
    const [amountContributionError, setAmountContributionError] =  useState(false);
    const [errorMessage, setErrorMessage] =  useState('');
    const [loading, setLoading] =  useState(false);

    const onSubmit = async (event) => {
        setAmountContributionError(false);
        setErrorMessage('');
        event.preventDefault();
        if(amountContribution && amountContribution != null) {
            setLoading(true);
            try {
                const accounts = await new web3.eth.getAccounts();
                const campaign = campaignInstance(props.address);
                await campaign
                        .methods
                        .contribute()
                        .send({
                            from: accounts[0],
                            value: web3.utils.toWei(amountContribution, 'ether')
                        });
                setAmountContribution('');
                setLoading(false);
                Router.pushRoute(`/campaigns/${props.address}`);
            } catch(err) {
                setErrorMessage(err.message);
                setLoading(false);
            }
        } else {
            setAmountContributionError(true);
            setLoading(false);
        }

    };

    return (
        <Form success onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribution </label>
                <Input 
                    label='ether' 
                    type="number"
                    labelPosition="right"
                    value={amountContribution}
                    onChange={(event) => {
                        setAmountContributionError(false);
                        setAmountContribution(event.target.value)
                    }}
                />
            </Form.Field>

            <Message error header='Oops!' content={errorMessage} />
            {amountContributionError && <Message floating>Please Enter Amount to Contribution!!</Message>}

            <Button loading={loading} primary>
                Contribute!!
            </Button>
        </Form>
    );
}

export default ContributeForm;