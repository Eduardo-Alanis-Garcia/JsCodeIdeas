datos = read.csv("Datos/Influenza.csv")

datos = datos |> 
  dplyr::rename(Fecha = X,
                `San Luis Potosi` = San.Luis.Potosi)


datos = datos |> 
  tidyr::pivot_longer(cols = Hidalgo:Total, names_to = "Estado", values_to = "Casos") |>  
  dplyr::select(Estado, Fecha, Casos)|> 
  dplyr::filter(Estado != "Total") |> 
  dplyr::mutate(Estado = dplyr::case_when(
    Estado == "Mexico" ~ "México",
    Estado == "San Luis Potosi" ~ "San Luis Potosí",
    Estado == "Queretaro" ~ "Querétaro",
    Estado == "Veracruz" ~ "Veracruz de Ignacio de la Llave",
    TRUE          ~ Estado
  ))


nacional = sf::read_sf("Datos/Nacional/00ent.shp")
nacional_centroides = nacional |> 
  dplyr::select(NOMGEO) |> 
  sf::st_centroid(geometry)


datos_geometria = merge(x = datos, y = nacional_centroides, by.x = "Estado", by.y = "NOMGEO", all.x = T, all.y = F)
datos_geometria = sf::st_as_sf(x = datos_geometria, crs = sf::st_crs(nacional))
datos_geometria = datos_geometria |> 
  dplyr::arrange(Fecha, Estado)

nacional$geometry |>  plot()
plot(datos_geometria$geometry, add = T, col = "red")

all((datos_geometria$geometry |>  sf::st_is_empty()) == F)



datos_geometria = sf::st_transform(x = datos_geometria, crs = 4326)
sf::write_sf(datos_geometria, "Datos/Influenza_timeline.geojson", driver = "GeoJSON")





datos_geometria
df = datos_geometria |> 
  tidyr::pivot_wider(names_from = Fecha, values_from = Casos)













####


d = datos_geometria
d = d |> 
  dplyr::rename(start = Fecha) |> 
  dplyr::mutate(end = start) |> 
  dplyr::select(Estado, Casos, start, end, geometry)


sf::write_sf(d, "Datos/Influenza_no_funcional.geojson", driver = "GeoJSON")

df = df |> 
  dplyr::relocate(geometry, .after = `2025-02-01`)
sf::write_sf(df, "Datos/Prueba.geojson", driver = "GeoJSON")

