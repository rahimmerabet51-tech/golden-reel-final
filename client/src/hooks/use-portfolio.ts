import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type InsertContactMessage } from "@shared/routes";

export function usePortfolioItems() {
  return useQuery({
    queryKey: [api.portfolio.list.path],
    queryFn: async () => {
      const res = await fetch(api.portfolio.list.path);
      if (!res.ok) throw new Error("Failed to fetch portfolio items");
      return api.portfolio.list.responses[200].parse(await res.json());
    },
  });
}

export function useServices() {
  return useQuery({
    queryKey: [api.services.list.path],
    queryFn: async () => {
      const res = await fetch(api.services.list.path);
      if (!res.ok) throw new Error("Failed to fetch services");
      return api.services.list.responses[200].parse(await res.json());
    },
  });
}

export function useClients() {
  return useQuery({
    queryKey: [api.clients.list.path],
    queryFn: async () => {
      const res = await fetch(api.clients.list.path);
      if (!res.ok) throw new Error("Failed to fetch clients");
      return api.clients.list.responses[200].parse(await res.json());
    },
  });
}

export function useContactMutation() {
  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send message");
      }
      
      return api.contact.create.responses[201].parse(await res.json());
    },
  });
}
