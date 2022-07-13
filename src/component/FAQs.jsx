import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const QueAns = [
  {
    id: "qa1",
    que: "How Do I Hire a Quality Service?",
    ans: `Lorem ipsum 1 dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`,
  },
  {
    id: "qa2",
    que: "Why I Need to Signin for Hire Professional?",
    ans: `Lorem ipsum 1 dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`,
  },
  {
    id: "qa3",
    que: "I'm a Professional, Can I List My Services On Your Site?",
    ans: `Lorem ipsum 2 dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`,
  },
  {
    id: "qa4",
    que: "How Can I Find Best Fit for My Services On Your Site?",
    ans: `Lorem ipsum 3 dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`,
  },
  {
    id: "qa5",
    que: "How Long Does It takes to Professional Respond?",
    ans: `Lorem ipsum 3 dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`,
  },
];

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1.3rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(2),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
}));

const FAQs = () => {
  const [expanded, setExpanded] = React.useState("qa1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      {QueAns.map((qa) => (
        <Accordion key={`${qa.id}-${qa.que}`} expanded={expanded === qa.id} onChange={handleChange(qa.id)}>
          <AccordionSummary aria-controls="faqd-content" id="faqd-header">
            <Typography variant="h6" color={expanded === qa.id ? 'primary' : ''}>{qa.que}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{qa.ans}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default FAQs;
