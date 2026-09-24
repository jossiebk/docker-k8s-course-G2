class Review:
    def __init__(
        self,
        id,
        titulo_libro,
        nombre_usuario,
        calificacion,
        comentario
    ):
        self.id = id
        self.titulo_libro = titulo_libro
        self.nombre_usuario = nombre_usuario
        self.calificacion = calificacion
        self.comentario = comentario

    def to_dict(self):
        return {
            "id": self.id,
            "tituloLibro": self.titulo_libro,
            "nombreUsuario": self.nombre_usuario,
            "calificacion": self.calificacion,
            "comentario": self.comentario
        }