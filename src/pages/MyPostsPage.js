import React, { Fragment } from "react"
import MainHeaderSeller from "../layouts/MainHeaderSeller";
import useRedirect from "../hooks/use-redirect";
import { Outlet } from "react-router-dom";


const MyPostsPage = () => {
    useRedirect('/login')

    return <Fragment>
        <MainHeaderSeller />
        <Outlet />
    </Fragment>
}
export default React.memo(MyPostsPage);