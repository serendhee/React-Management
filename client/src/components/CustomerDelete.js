import React from "react";
import "../App.css";

function CustomerDelete({ id, stateRefresh }) {

    const deleteCustomer = (id) => {
        const url = "/api/customers/" + id;
        fetch(url, {
            method: "DELETE"
        }).then(() => {
            stateRefresh();
        });
    };

    return (
        <button onClick={() => deleteCustomer(id)} className="font-bold duration-200 hover:text-red-500"
>삭제</button>
    );
}

export default CustomerDelete;
