import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions"

const WindowDimensions = (() => {
    global.windowWidth = useWindowDimensions().width;
    global.windowHeight = useWindowDimensions().height;
    return (<></>);
})


