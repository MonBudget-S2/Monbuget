import React from 'react';
import { useParams } from "react-router";

export default function BudgetEventShow(){
    const { id } = useParams();
    return(
        <h1>{ id }</h1>
    );
}

