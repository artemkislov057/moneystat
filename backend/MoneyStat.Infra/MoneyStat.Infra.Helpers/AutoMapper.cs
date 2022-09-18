﻿using System.Linq.Expressions;
using AutoMapper;

namespace MoneyStat.Infra.Helpers;

public static class TypeMapper<TFrom, TTo>
{
    private static IMapper mapper;
    private static readonly MapperConfigurationExpression MapperConfigurationExpression;
    private static IMappingExpression mappingExpression;

    static TypeMapper()
    {
        MapperConfigurationExpression = new MapperConfigurationExpression
        {
            AllowNullCollections = true,
            AllowNullDestinationValues = true
        };
        ReconfigureWith<TFrom, TTo>();
        var configurationProvider = new MapperConfiguration(MapperConfigurationExpression);
        mapper = new Mapper(configurationProvider);
    }

    private static void ReconfigureWith<TFromConf, TToConf>()
    {
        mappingExpression = typeof(TFromConf).IsArray
            ? MapperConfigurationExpression.CreateMap(typeof(TFromConf).GetElementType(),
                typeof(TToConf).GetElementType())
            : MapperConfigurationExpression.CreateMap(typeof(TFromConf), typeof(TToConf));

        mappingExpression.ReverseMap();

        var configurationProvider = new MapperConfiguration(MapperConfigurationExpression);
        mapper = new Mapper(configurationProvider);
    }

    public static void ReconfigureWithResolver<TToMember, TValueResolver>(
        Expression<Func<TTo, TToMember>> destSelector)
        where TValueResolver : IValueResolver<TFrom, TTo, TToMember>
    {
        var expression = (MemberExpression)destSelector.Body;
        mappingExpression.ForMember(expression.Member.Name, opt => opt.MapFrom(typeof(TValueResolver)));
        var configurationProvider = new MapperConfiguration(MapperConfigurationExpression);
        mapper = new Mapper(configurationProvider);
    }

    public static void CustomMap(
        Action<IMapperConfigurationExpression> configure,
        bool allowNullCollections = true,
        bool allowNullDestinationValues = true,
        Action<IMappingExpression<TFrom, TTo>> postMapAction = null)
    {
        var configuration = new MapperConfiguration(configurationExpression =>
        {
            configurationExpression.AllowNullDestinationValues = allowNullDestinationValues;
            configurationExpression.AllowNullCollections = allowNullCollections;

            configure(configurationExpression);

            var expression = configurationExpression.CreateMap<TFrom, TTo>();
            if (postMapAction != null)
                postMapAction(expression);
        });

        mapper = new Mapper(configuration);
    }


    public static TTo MapForward(TFrom from) => mapper.Map<TFrom, TTo>(from);
    public static void MapForward(TFrom from, TTo to) => mapper.Map(from, to);

    public static TFrom MapBackward(TTo from) => mapper.Map<TTo, TFrom>(from);
    public static void MapBackward(TTo to, TFrom from) => mapper.Map(to, from);
}