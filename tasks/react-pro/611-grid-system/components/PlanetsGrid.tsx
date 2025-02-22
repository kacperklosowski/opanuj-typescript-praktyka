import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Planet, SWAPIResponse } from '../types';

interface PlanetsGridProps {
  as: React.ElementType;
  columns: number;
  children: (planet: Planet) => React.ReactNode;
}

export function PlanetsGrid({as, columns, children}: PlanetsGridProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const { data } = await axios.get<SWAPIResponse>('https://swapi.dev/api/planets/');
        setPlanets(data.results);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  const Component = as;

  return (
    <Component className=" bg-gray-900" data-testid="planets-grid">
      <div className={`grid gap-6 grid-cols-1 md:grid-cols-${columns} auto-rows-fr`}>
        {planets.map((planet) => (
          <div key={planet.url} className="h-full">
            {children(planet)}
          </div>
        ))}
      </div>
    </Component>
  );
}
