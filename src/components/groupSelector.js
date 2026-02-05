import { useState } from "react";


// userId置き換え
const goToGroup = (groupId) => {

}
// const groups = [
//     {
//         id: 1,
//         name: 'asd'
//     },
//     {
//         id: 2,
//         name: 'asd2'
//     },
//     {
//         id: 3,
//         name: 'asd3'
//     },
// ];

const GroupSelector = ({userId}) => {
    const [groups, setGroups] = useState([]);

    const fetchGroups = async (userId) => {
        try {
            const groups = await fetch(`http://localhost:5000/groups/${userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            setGroups(groups);
        }catch{
            console.error(`fetch error userId:${userId}`);
        }
    }


    fetchGroups({userId});
    const buttons = groups.map(group =>
        <div>
            <button onclick={goToGroup(group.id)}>
                <span>{group.name}</span>
            </button >
        </div>
    );

    return (
        <>
            {buttons}
        </>
    );
}

export default GroupSelector;