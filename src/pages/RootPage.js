import { Outlet } from "react-router-dom";
import React from 'react';

const RootPage = () => {

    return <main>
        <Outlet />
    </main>
}
export default React.memo(RootPage);