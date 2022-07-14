import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import "./styles.css";

export const Contact = () => {
  interface Grow {
    id: number;
    nome: string;
    email: string;
    telefone: string;
  }

  const [growdevId, setGrowdevId] = useState(0);
  const [growdevs, setGrowdevs] = useState<Grow[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleClear = () => {
    setNome("");
    setEmail("");
    setTelefone("");
  };

  const atualiza = (grow: string[]) => {
    localStorage.setItem("growdevs", JSON.stringify(grow));
  };

  const recupera = () => {
    const growJson = localStorage.getItem("growdevs");
    return growJson !== null ? JSON.parse(growJson) : [];
  };

  const handleGrowdev = () => {
    setGrowdevs(recupera);
  };

  useEffect(() => {
    handleGrowdev();
    console.log({ growdevs });
  }, [growdevId]);

  const addGrowdevHandler = () => {
    if (nome != "" && email != "" && telefone != "") {
      const growbd = recupera();

      growbd.push({
        id: growbd.length + 1,
        nome,
        email,
        telefone,
      });

      atualiza(growbd);
      console.log({ growbd });
      setGrowdevId(growbd.length + 1);
    } else {
      alert("preencha os dados");
    }
  };

  return (
    <>
      <Grid item container justifyContent='center'>
        <Grid item>
          <Box mt={8} display='flex'>
            <Card sx={{ boxShadow: "0 0 1em black" }}>
              <CardMedia
                component='img'
                height='300'
                image='assets/banner-2.png'
                alt='unsplash random'
                sx={{ backgroundColor: "#010F1C" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h4'
                  component='div'
                  align='center'
                >
                  Contact Book Growdev
                </Typography>
                <Box component='div' display='flex' flexDirection='column'>
                  <TextField
                    label='Nome'
                    variant='outlined'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <TextField
                    type='email'
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    sx={{ mt: "8px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    type='tel'
                    label='Telefone'
                    variant='outlined'
                    sx={{ mt: "8px" }}
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </Box>
                <Box mt={1}>
                  <Button
                    type='button'
                    variant='outlined'
                    color='success'
                    size='medium'
                    sx={{ mr: "8px" }}
                    onClick={addGrowdevHandler}
                  >
                    Salvar
                  </Button>
                  <Button
                    type='reset'
                    variant='outlined'
                    color='error'
                    size='medium'
                    onClick={handleClear}
                  >
                    Cancelar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item>
          <Box mt={6} ml={2}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align='right'>Nome</TableCell>
                    <TableCell align='right'>Email</TableCell>
                    <TableCell align='right'>Telefone</TableCell>
                    <TableCell align='center'>Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {growdevs.map((grow, id) => (
                    <TableRow key={id}>
                      <TableCell>{grow.id}</TableCell>
                      <TableCell align='right'>{grow.nome}</TableCell>
                      <TableCell align='right'>{grow.email}</TableCell>
                      <TableCell align='right'>{grow.telefone}</TableCell>

                      <TableCell align='center'>
                        <IconButton aria-label='delete' color='error'>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label='delete' color='secondary'>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
