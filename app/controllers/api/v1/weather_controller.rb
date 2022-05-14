class Api::V1::WeatherController < ApplicationController
  require "rest-client"
  require "json"
  
  def show
    api_key = Rails.application.credentials.open_weather_api
    limit = 1
    city, state, country = params[:city], params[:state], params[:country]

    get_coord_url = "http://api.openweathermap.org/geo/1.0/direct?q=#{city},#{state},#{country}&limit=#{limit}&appid=#{api_key}"
    
    res_coord = RestClient.get(get_coord_url)
    coords = JSON.parse(res_coord.body)
    lat, lon = coords["lat"], coords["lon"]

    coord_weather_url = "https://api.openweathermap.org/data/2.5/weather?lat=#{lat}&lon=#{lon}&units=imperial&appid=#{api_key}"

    res_weather = RestClient.get(coord_weather_url)
    @data = JSON.parse(res_weather.body)
    
    weather_str = "#{data.main.temp} F, #{data.weather.description}"
    weather_icon = "http://openweathermap.org/img/wn/#{data.weather.icon}@2x.png"

    # render json: res
  end  
end