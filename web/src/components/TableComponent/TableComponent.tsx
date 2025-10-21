import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TableComponent = (props: any) => {
  const colKeys = Object.keys(props.data.columns[0]);
  // console.log({ colKeys })
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {colKeys.map((key: any) => (
              <TableCell key={key}>{props.data.columns[0][key]}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.rows.map((row: any) => (
            <TableRow
              key={row.contract}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="cell-link">
                {row.contract}
              </TableCell>
              <TableCell>{row.doctype}</TableCell>
              <TableCell>{row.prodline}</TableCell>
              <TableCell>{row.pricing}</TableCell>
              <TableCell>{row.startdate}</TableCell>
              <TableCell>{row.enddate}</TableCell>
              <TableCell>{row.performance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
