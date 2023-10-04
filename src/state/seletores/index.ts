import { filtroDeEventos, listaDeEventosState } from './../atom';
import { selector } from "recoil";
import { IEvento } from '../../interfaces/IEvento';

export const eventosFiltradosState = selector({
  key: 'eventosFiltradosState',
  get: ({ get }) => {
    const filtro = get(filtroDeEventos)
    const todosEventos = get(listaDeEventosState)

    const eventos = todosEventos.filter(evento => {
      if (!filtro.data) {
        return true;
      }
      const mesmoDia = filtro.data.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10)
      return mesmoDia
    })
    return eventos
  }
})

export const eventosAsync = selector({
  key: 'eventosAsync',
  get: async () => {
    const resposta = await fetch('http://localhost:8000/eventos')
    const eventos: IEvento[] = await resposta.json()
    return eventos.map(evento => ({
      ...evento,
      inicio: new Date(evento.inicio),
      fim: new Date(evento.fim)
    }))
  }
})
