# DATACONN
This project utilizes a weather app API. Using a dataset of cities filtered by population size,
this program randomly selects a city and uses its longitude and latitude to find the humidity of
the city at the current moment in time. It then uses that humidity to create a visual on the screen.
The placement of this visual depends on the mini-controller. When in the "drums" setting, each key
represents a different placement on the screen's canvas and will place the city's humidity visual there.
The color, radius, and line width of the visual depends on the city's current humidity, temperature, and wind speed.