import React from "react"
import { Spin, Typography } from "antd"
import "../static/css/lib.css"

export const FullPageLoading = () =>{
    return (
        <div className="full-page">
            <Spin size={"large"}></Spin>
        </div>
    )
}

export const FullPageErrorFallback = ({error})=>{
    return (
        <div className="full-page">
            <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
        </div>
    )
}