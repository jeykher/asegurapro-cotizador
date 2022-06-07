import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AmountFormat from "../../../../components/tools/AmountFormat";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

export const TableMetodosPago = ({ jsonPlan }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell
              align="center"
              sx={{
                backgroundColor: "#F3F3F3",
                fontWeight: 600,
                color: "#3C4858",
              }}
            >
              Anual
            </TableCell>
            <TableCell align="center">
              <AmountFormat value={jsonPlan.prima} />
            </TableCell>
          </TableRow>
          {jsonPlan.fraccionamiento.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "#F3F3F3",
                  fontWeight: 600,
                  color: "#3C4858",
                }}
              >
                {row.nomplan}
              </TableCell>
              <TableCell align="center">
                <AmountFormat value={row.prima} />{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const TableCoberturas = ({ coberturas }) => {
  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F3F3F3" }}>
            <TableCell
              sx={{ fontWeight: 700, color: "#3C4858" }}
              align="center"
            >
              Coberturas
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, color: "#3C4858" }}
              align="center"
            >
              Suma asegurada
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, color: "#3C4858" }}
              align="center"
            >
              Prima
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coberturas.map((row) => (
            <TableRow
              // key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                {row.desccobert}
                </TableCell>
              <TableCell align="center">
              {row.indcobley !== undefined && row.indcobley == 'S' ? 'Según ley': row.suma_aseg == 0 ? (
                  <CheckIcon
                    style={{
                      color: "#4caf50",
                      size: "24px",
                    }}
                  />
                ) : (
                  <AmountFormat value={row.suma_aseg} />
                )}
              </TableCell>
              <TableCell align="center">
                {row.indcobley !== undefined && row.indcobley == 'S' ? (
                  <CheckIcon
                    style={{
                      color: "#4caf50",
                      size: "24px",
                    }}
                  />
                ) : (
                  <AmountFormat value={row.prima} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const TableEdificacion = ({ jsonPlan }) => {
  console.log(jsonPlan);
  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F3F3F3" }}>
            <TableCell
              sx={{ fontWeight: 700, color: "#3C4858" }}
              align="center"
            >
              Coberturas
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, color: "#3C4858" }}
              align="center"
            >
              Suma asegurada
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, color: "#3C4858" }}
              align="center"
            >
              Prima
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jsonPlan.bienes.map((row) => (
            <>
              {row.descbien === "Edificacion" &&
                row.coberturas.map((row) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.desccobert}</TableCell>
                    <TableCell align="center">
                      <AmountFormat value={row.suma_aseg} />
                    </TableCell>
                    <TableCell align="center">
                      <AmountFormat value={row.prima} />
                    </TableCell>
                  </TableRow>
                ))}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const TableMobiliario = ({ jsonPlan }) => {
  console.log(jsonPlan);
  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F3F3F3" }}>
            <TableCell
              sx={{ fontWeight: 700, color: "#3C4858" }}
              align="center"
            >
              Coberturas
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, color: "#3C4858" }}
              align="center"
            >
              Suma asegurada
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, color: "#3C4858" }}
              align="center"
            >
              Prima
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jsonPlan.bienes.map((row) => (
            <>
              {row.descbien === "Mobiliario" &&
                row.coberturas.map((row) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.desccobert}</TableCell>
                    <TableCell align="center">
                      <AmountFormat value={row.suma_aseg} />
                    </TableCell>
                    <TableCell align="center">
                      <AmountFormat value={row.prima} />
                    </TableCell>
                  </TableRow>
                ))}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
