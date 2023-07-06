import Avatar from "@mui/material/Avatar";
import * as React from "react";

export default function UserAvatar({ url, anchorRef = null, open = null }) {
    const avatarProps = {
        ...(anchorRef && { ref: anchorRef }),
        ...(open !== null && {
            'aria-controls': open ? 'menu-list-grow' : undefined,
            'aria-haspopup': 'true'
        })
    };

    return <Avatar {...avatarProps} src={url}/>;
}