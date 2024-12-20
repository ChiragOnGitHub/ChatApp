import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
import { useSelector } from "react-redux";

const ScrollableChat = ({ messages}) => {
  const { user } = useSelector((state) => state.profile);
 
  
  return (
    <ScrollableFeed>
      {messages && 
        messages.map((m, i) => (
            
          <div className="flex" key={m._id}>
          
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <img
                    className="h-8 w-8 rounded-full mr-2 mt-1"
                    src={
                        m.sender.image
                        ? m.sender.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${m.sender.firstName}`
                    }
                    alt={m.sender.firstName + " " + m.sender.lastName}
                    />
            )}
            <span
              className={`rounded-2xl px-4 py-2 max-w-[75%] break-words overflow-hidden whitespace-normal text-sm ${
                m.sender._id === user._id
                  ? "bg-blue-200 text-right ml-auto"
                  : "bg-pink-50 text-left"
              }`}
              style={{
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;



// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../../config/ChatLogics";
// import { useSelector } from "react-redux"

// const ScrollableChat = ({ messages }) => {
//   const { user} = useSelector((state) => state.chat);

//   return (
//     <ScrollableFeed>
//       {messages &&
//         messages.map((m, i) => (
//           <div style={{ display: "flex" }} key={m._id}>
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <span
//               style={{
//                 backgroundColor: `${
//                   m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
//                 }`,
//                 marginLeft: isSameSenderMargin(messages, m, i, user._id),
//                 marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
//                 borderRadius: "20px",
//                 padding: "5px 15px",
//                 maxWidth: "75%",
//               }}
//             >
//               {m.content}
//             </span>
//           </div>
//         ))}
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;
