import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/common/Loader";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grow from "@material-ui/core/Grow";
import "./styles.css";
import { getUsedRoom } from "../../../redux/actions/overview";
export default function Overview() {
  function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex" paddingTop="20px">
        <Box
          position="relative"
          display="inline-flex"
          boxShadow={2}
          height={300}
          width={200}
          justifyContent="center"
          marginRight={"15px"}
          marginBottom={"20px"}
        >
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            justifyContent="center"
          >
            <Typography
              variant="h4"
              component="div"
              color="textSecondary"
              style={{ paddingTop: "20px" }}
            >
              {`${props.allRoom - props.availabeRoom}/${props.allRoom}`}
            </Typography>
          </Box>
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            justifyContent="center"
          >
            <Typography
              variant="h6"
              component="div"
              color="textSecondary"
              style={{ paddingTop: "80px" }}
            >
              {`Còn trống ${props.availabeRoom} chỗ`}
            </Typography>
          </Box>
          <CircularProgress
            variant="determinate"
            color={"primary"}
            size={100}
            style={{
              color: "olivedrab",
              marginTop: "130px",
              position: "absolute",
            }}
            value={100}
          />
          <CircularProgress
            variant="determinate"
            color={"primary"}
            size={100}
            style={{ color: "maroon", marginTop: "130px" }}
            value={Number(
              (
                ((props.allRoom - props.availabeRoom) / props.allRoom) *
                100
              ).toFixed(3)
            )}
          />

          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            justifyContent="center"
          >
            <Typography
              variant="h5"
              component="div"
              color="textSecondary"
              style={{
                paddingTop: "170px",
                paddingLeft: "8px",
                fontSize: "20px",
              }}
            >
              {`${
                props.availabeRoom
                  ? (
                      ((props.allRoom - props.availabeRoom) / props.allRoom) *
                      100
                    ).toFixed(2)
                  : "0"
              }%`}
            </Typography>
          </Box>
          <Box position="absolute" bottom={5}>
            <Typography variant="h4" component="div" color="textSecondary">
              {props.name}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  const [data, setData] = useState(null);

  const loader = useSelector((state) => state.overview.loading);

  useEffect(() => {
    getUsedRoom((output) => {
      if (output) {
        setData(output);
      }
    });
  }, []);

  return (
    <div className="col col-full">
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          {data && (
            <Grow
              in={true}
              timeout={1000}
              style={{ transformOrigin: "10 10 10" }}
            >
              <Box style={{ transform: "scale(1)" }}>
                <Box
                  style={{
                    transform: "scale(1)",
                    marginLeft: "10%",
                  }}
                >
                  {data.map((n, index) => {
                    return (
                      <CircularProgressWithLabel
                        key={index}
                        name={n.name}
                        allRoom={n.total}
                        availabeRoom={n.total - n.full}
                      />
                    );
                  })}
                </Box>
              </Box>
            </Grow>
          )}
        </div>
      )}
    </div>
  );
}
