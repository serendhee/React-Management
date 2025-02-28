import React from "react";


//계층적
function Customer(props) {
    return(
        <div>
            <CustomerProfile id={props.id} image={props.image} name={props.name}/>
            <CustomerInfo birthday={props.birthday} gender={props.gender} job={props.job} />
        </div>
    )
}

// 사용자의 프로필 이미지 이름 아이디
function CustomerProfile(props) {
    return(
        <div>
            <img src={props.image} alt="profile"/>
            <h2 className="text-2xl font-bold">{props.name}{props.id}</h2>
        </div>
    )
}

// 사용자의 남은 데이터
function CustomerInfo(props) {
    return(
        <div>
            <p>{props.birthday}</p>
            <p>{props.gender}</p>
            <p>{props.job}</p>
        </div>
    )
}

export default Customer;