export class API {
  constructor (artista, song) {
    this.artista = artista;
    this.song = song;
  }

  async consultarAPI () {
    const url = await fetch(`https://api.lyrics.ovh/v1/${this.artista}/${this.song}`);
    const respuesta = await url.json();
    return {
      respuesta
    };
  }
}
