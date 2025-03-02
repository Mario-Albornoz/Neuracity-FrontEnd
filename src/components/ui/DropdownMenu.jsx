import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';

function DropdownMenu(){

    const [openMenu, setOpenMenu] = useState(false);

    return(
        <div className="absolute right-2 top-3 w-10">
            <IconButton onClick={() => setOpenMenu(!openMenu)}>
                <MoreVertIcon/>
            </IconButton>

            {
            openMenu && 
            <ul className="relative text-xs border-2 border-purple-300 bg-violet-200 rounded left-10 bottom-9 p-3 w-20">
                <li className="border-violet-700 m-0.3 mb-2.5">Delete</li>
                <li className="m-0.3">Edit</li>
            </ul>
            }
        </div>
    );
}

export default DropdownMenu