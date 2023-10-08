import { MainChat } from '../containers/MainChat';

const ChatComponent = () => {
    console.log("RENDERING CHAT COMPONENT")
    return (
            <div className="S--focusing" style={{ height: '100vh' }}>
                <MainChat />
            </div>
        );

};

export default ChatComponent;