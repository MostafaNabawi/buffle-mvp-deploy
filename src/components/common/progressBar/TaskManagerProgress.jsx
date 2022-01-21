// import { React, useEffect, useState } from "react";
// import { Row, Col, ProgressBar } from "react-bootstrap";
// import { Icon } from "@iconify/react";
// import style from "./style.module.css";
// import Countdown from "react-countdown";
// const TaskManagerPreogressBar = () => {
//   const [play, setPlay] = useState(true);

//   return (
//     <>
//       <Row>
//         <Col xl="11" className="pl-0">
//           <Icon
//             // color={play && percentUI > 0 ? "" : `#4922ff`}
//             className={style.iconWatch}
//             icon="bi:clock-fill"
//           />
//           <ProgressBar
//             label={ `
//                     ${new Date().getHours()}
//                     :${new Date().getMinutes()}
//                     :${new Date().getSeconds()}
//                     `
//             }
//             now={80}
//             className={style.progress}
//           />
//         </Col>
//         <Col className={style.iconPlay} xl="1">
//           <div
//             // onClick={handlePlay}
//             className={`${style.iconProgress}  text-center`}
//           >
//             {play ? (
//                   <i><Icon icon="gg:play-pause" /></i>

//             ) : (
//               <Icon icon="bi:play-fill" />
//             )}
//           </div>
//         </Col>
//       </Row>
//     </>
//   );
// };
// export default TaskManagerPreogressBar;
