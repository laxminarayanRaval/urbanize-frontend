import {
  ExpandMore,
  Favorite,
  Message,
  MoreVert,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

import { makeAvtarText } from "../utils/Helpers";

const ServiceListCard = ({
  loading = false,
  title = "",
  status = "",
  avtarUrl = "",
  content,
  ...props
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if (loading) {
  }
  return (
    <Card sx={{ m: 1 }}>
      <CardHeader
        avatar={
          <Avatar src={avtarUrl} sx={{ bgcolor: "#F55" }} aria-label="recipe">
            {makeAvtarText(title)}
          </Avatar>
        }
        action={
          <>
            <IconButton>
              <Message />
            </IconButton>
            <IconButton aria-label="add to favorites">
              <Favorite />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </>
        }
        title={title}
        subheader={status}
      />
      <CardMedia
        component="img"
        height="194"
        image={content?.proof_img_url}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <ExpandMore
          expand={expanded.toString()}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more" /> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
};

export default ServiceListCard;
