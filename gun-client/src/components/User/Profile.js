/* eslint-disable default-case */
/* eslint-disable no-unreachable */
import React, { useEffect, useReducer } from "react";
import { user } from "../../gun/user";


const currentState = {
    classes: [],
    university: [],
    name: [],
}

const reducer = (state, dispatched) => {
    switch (dispatched.action) {
        case "add":
            let { classes } = dispatched;
            return {
                classes: [classes, ...state.classes]
            }
            break;
        case "clear":
            return { classes: [] }
            break;
    }
}
// const reducerFriends = (state, dispatched) => {
//     switch (dispatched.action) {
//         case "add":
//             let { friends } = dispatched;
//             return {
//                 classes: [friends, ...state.friends]
//             }
//             break;
//         case "clear":
//             return { friends: [] }
//             break;
//     }
// }
// const reducerUni = (stateUni, dispatchUni) => {
//     switch (dispatchUni.action) {
//         case "add":
//             let { university } = dispatchUni;
//             return {
//                 university: [university, ...stateUni.university]
//             }
//             break;
//         case "clear":
//             return { university: [] }
//             break;
//     }
// }


export default function Profile() {
    const [showClassModal, setShowClassModal] = React.useState(false);
    const [showUniModal, setShowUniModal] = React.useState(false);
    const [showNameModal, setShowNameModal] = React.useState(false);

    const [className, setClassName] = React.useState("");
    const [state, dispatch] = useReducer(reducer, currentState)

    // const [stateFriends, dispatchFriends] = useReducer(reducerFriends, currentState)

    const [currentUni, setUniversity] = React.useState("");

    const [currentName, setName] = React.useState("");

    function saveUniversity() {
        console.log("Setting New University");
        console.log('Uni:', currentUni);
        user.get("university").set(currentUni);
    }

    function saveClass() {
        console.log("Setting New Class");
        console.log('classname:', className);
        user.get("classes").set(className);
    }

    function saveName() {
        console.log("Setting New Name");
        console.log('Name:', currentName);
        user.get("name").set(currentName);
    }

    const courses = user.get("classes");

    const university = user.get("university");

    const name = user.get("name");


    function loadUniData() {
        const uni = new Set()
        university.map().on((data, key) => {
            uni.add(data)
        });
        return uni
    }
    const [first] = loadUniData();


    function loadClasses() {
        console.log("Loading Courses");
        courses.map().on((data, key) => {
            dispatch({
                action: "add",
                classes: {
                    className: data
                }
            })
        });
    }

    function loadName(){
        const names = new Set()
        name.map().on((data, key) => {
            names.add(data)
        });
        return names
    }
    const [,nam] = loadName();


    const newClassArray = () => {
        const formattedMessages = state.classes.filter((value, index) => {
            const _value = JSON.stringify(value)
            return (
                index ===
                state.classes.findIndex(obj => {
                    return JSON.stringify(obj) === _value
                })
            )
        })

        return formattedMessages
    }

    // const newUniArray = () => {
    //     const formattedMessages = stateUni.university.filter((value, index) => {
    //         const _value = JSON.stringify(value)
    //         return (
    //             index ===
    //             stateUni.university.findIndex(obj => {
    //                 return JSON.stringify(obj) === _value
    //             })
    //         )
    //     })

    //     return formattedMessages
    // }

    // console.log("New Classes:", newClassArray())
    // console.log("New Uni:", newUniArray())


    useEffect(() => {
        dispatch({ action: "clear" });
        loadClasses();
        loadUniData();
        loadName();
    }, []);


    return (
        <div className="p-16 bg-gray-900">
            <div className="p-8 bg-white shadow mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                        <div>
                            <p className="font-bold text-gray-700 text-xl">22</p>
                            <p className="text-gray-400">Friends</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">10</p>
                            <p className="text-gray-400">Courses</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">89</p>
                            <p className="text-gray-400">Posts</p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                        <button
                            className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                            Connect
                        </button>
                        <button
                            className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                            type="button"
                            onClick={() => setShowClassModal(true)}
                        >
                            Edit
                        </button>
                        {showClassModal ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-3xl font-semibold">
                                                    Add a Class
                                                </h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() => setShowClassModal(false)}
                                                >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            {/*body*/}
                                            <div className="relative p-6 flex-auto">
                                                <div>
                                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                                    <input onChange={(e) => { setClassName(e.target.value.toUpperCase()) }} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CSE320" required />
                                                </div>
                                            </div>

                                            <div className="relative p-6 flex-auto">
                                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                </p>
                                            </div>
                                            {/*footer*/}
                                            <div className="flex justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowClassModal(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={
                                                        () => { setShowClassModal(false); saveClass() }
                                                    }
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                    </div>
                </div>

                <div className="mt-20 text-center border-b pb-6">
                    <div className="text-4xl font-medium text-gray-700" onClick={() => setShowNameModal(true)}> {nam} </div>
                    {showNameModal ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-3xl font-semibold">
                                                    Change Name
                                                </h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() => setShowNameModal(false)}
                                                >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            {/*body*/}
                                            <div className="relative p-6 flex-auto">
                                                <div>
                                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                                    <input onChange={(e) => { setName(e.target.value) }} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Riley Cook" required />
                                                </div>
                                            </div>

                                            <div className="relative p-6 flex-auto">
                                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                </p>
                                            </div>
                                            {/*footer*/}
                                            <div className="flex justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowNameModal(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={
                                                        () => { setShowNameModal(false); saveName() }
                                                    }
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                    <p className="font-light text-gray-600 mt-3"> {first} <div className="font-light text-gray-500" onClick={() => setShowUniModal(true)}>Edit</div> </p>
                    {showUniModal ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                                Edit
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowUniModal(false)}
                                            >
                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                            <div>
                                                <input onChange={(e) => { setUniversity(e.target.value) }} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Michigan State University" required />
                                            </div>
                                        </div>

                                        <div className="relative p-6 flex-auto">
                                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                            </p>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowUniModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={
                                                    () => { setShowUniModal(false); saveUniversity() }
                                                }
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                    {newClassArray().map((courses, index) => [

                        <div className="flex flex-col justify-center">
                            <p className="text-gray-600 text-center font-light lg:px-16">{courses.className}</p>
                        </div>
                    ])}

                </div>

                <div className="mt-12 flex flex-col justify-center">
                    <p className="text-gray-600 text-center font-light lg:px-16"></p>
                    {/* <button
                        className="text-indigo-500 py-2 px-4  font-medium mt-4"
                    >
                        Show more
                    </button> */}
                </div>

            </div>
        </div>

    )
}