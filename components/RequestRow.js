import React, { useState } from "react";
import { Button, Table } from 'semantic-ui-react'
import web3 from "../ethereum/web3";
import campaignInstance from "../ethereum/campaign";
import {Link, Router} from '../routes';

const RequestRow = ({id, request, address, approversCount}) => {
    const [onApproveLoading, setOnApproveLoading] = useState(false);
    const [onFinalizeLoading, setOnFinalizeLoading] = useState(false);
    const readyToFinalize = request?.approvalCount > approversCount / 2;

    const onApprove = async (id) => {
        try {
            setOnApproveLoading(true);
            const campaign = campaignInstance(address);
    
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(id).send({
                from: accounts[0]
            });
            setOnApproveLoading(false);
            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch(err) {
            setOnApproveLoading(false);
        }
    }

    const onFinalize = async (id) => {
        try {
            setOnFinalizeLoading(true);
            const campaign = campaignInstance(address);
    
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(id).send({
                from: accounts[0]
            });
            setOnFinalizeLoading(false);
            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch(err) {
            setOnFinalizeLoading(false);
        }
    }

    return (
        <Table.Row 
            disabled={request.complete} 
            positive={readyToFinalize && !request.complete}
        >
            <Table.Cell>
                {parseInt(id) + 1}
            </Table.Cell>
            <Table.Cell>
                {request.description}
            </Table.Cell>
            <Table.Cell>
                {web3.utils.fromWei(request.value, 'ether')}
            </Table.Cell>
            <Table.Cell>
                {request.recipient}
            </Table.Cell>
            <Table.Cell>
                {request.approvalCount}/{approversCount}
            </Table.Cell>
            <Table.Cell>
                <Button 
                    color="green" 
                    basic
                    disabled={request.complete ? true : false}
                    loading={onApproveLoading}
                    onClick={() => onApprove(id)}
                >Primary</Button>
            </Table.Cell>
            <Table.Cell>
                <Button 
                    color="teal" 
                    basic
                    disabled={request.complete ? true : false}
                    loading={onFinalizeLoading}
                    onClick={() => onFinalize(id)}
                >Finalize</Button>
            </Table.Cell>
        </Table.Row>
    );
}

export default RequestRow;