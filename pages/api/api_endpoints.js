import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://yxxeykqqytazrtqgekup.supabase.co', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4eGV5a3FxeXRhenJ0cWdla3VwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODE2NDg3MiwiZXhwIjoyMDEzNzQwODcyfQ.d6NTLLcurXktkX1Su_uXU24nW-AwwZ2lmrqC2-ccvXQ");

export async function insertUser(id, name, points = 0, contact = null, helper = null, completed_orders = null, in_progress = null) {
    if (id === undefined || name === undefined) {
        console.error('Error: id and name are required parameters.');
        return;
    }
    
    try {
        const { data, error } = await supabase
            .from('Users')
            .insert([
                { id: id, name: name, points: points, contact: contact, helper: helper, completed_orders: completed_orders, in_progress: in_progress }
            ]);

        if (error) {
            console.error('Error inserting data:', error);
        } else {
            return data
        }
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

export async function fetchUsers() {

    try {
        const { data, error } = await supabase
        .from('Users')
        .select('*')      
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            return data
        }
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

export async function createRequest(start = null, end = null, order_info = null, status = "open", dorm = null, requester = null) {
    try {
        // Fetch the highest existing ID from the Requests table
        // const { data: maxIdData, error: maxIdError } = await supabase
        //     .from('Requests')
        //     .select('id', { head: true, count: 'exact', ordering: { column: 'id', ascending: false }, limit: 1 });

        // if (maxIdError) {
        //     console.error('Error fetching max ID:', maxIdError);
        //     return null;
        // }

        // Calculate the new ID by adding 1 to the highest existing ID
        //const newId = maxIdData[0]?.id ? maxIdData[0].id + 1 : 1;

        // Insert the new request with the calculated new ID
        const { data, error } = await supabase
            .from('Requests')
            .insert([{id: Math.floor(Math.random() * 10000),start: start, end: end, order_info: order_info, status: status, dorm: dorm, requester: requester, deliverer: "none" }]);

        if (error) {
            console.error('Error inserting data:', error);
            return null;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error inserting data:', error);
        return null;
    }
}



export async function acceptRequest(id, deliverer) {

    try {
        const { data, error } = await supabase
        .from('Requests')
        .update({status: "in-progress", deliverer: deliverer})  
        .eq('id', id);    
        if (error) {
            console.error('Error accepting request:', error);
        } else {
            return data
        }
    } catch (error) {
        console.error('Error accepting request:', error);
    }
}

export async function finishRequest(id) {

    try {
        const { data, error } = await supabase
        .from('Requests')
        .update({status: "completed"})  
        .eq('id', id);    
        if (error) {
            console.error('Error finishing request:', error);
        } else {
            return data
        }
    } catch (error) {
        console.error('Error finishing request:', error);
    }
}

export async function addPoints(x_id, x) {

    try {
        const { data, error } = await supabase
        .rpc('increments', {i: x_id, pts: x}) 
        if (error) {
            console.error('Error adding points:', error);
        } else {
            return data
        }
    } catch (error) {
        console.error('Error adding points:', error);
    }
}

export async function fetchRequests() {

    try {
        const { data, error } = await supabase
        .from('Requests')
        .select('*')      
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            return data;
        }
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}

export async function getNameById(id) {
    try {
        const { data, error } = await supabase
            .from('Users')
            .select('name')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching user name:', error);
            return null;
        } else {
            return data.name;
        }
    } catch (error) {
        console.error('Error fetching user name:', error);
        return null;
    }
}

export async function getRequests() {
    try {
        const { data, error } = await supabase
            .from('Requests')
            .select('*')
            .eq('status', "in-progress")

        if (error) {
            console.error('Error fetching requests:', error);
            return null;
        } else {
            return data;
        }
    } catch (error) {
        console.error('Error fetching requests:', error);
        return null;
    }
}

export async function getRequestsByRequester() {
    try {
        const { data, error } = await supabase
            .from('Requests')
            .select('*')
            .eq('status', 'in-progress')

        if (error) {
            console.error('Error fetching requests:', error);
            return null;
        } else {
            return data;
        }
    } catch (error) {
        console.error('Error fetching requests:', error);
        return null;
    }
}

export async function fetchLeaderboard() {

    try {
        const { data, error } = await supabase
        .rpc('sort_users_by_points', {}) 
        if (error) {
            console.error('Error getting leaderboard:', error);
        } else {
            return data
        }
    } catch (error) {
        console.error('Error getting leaderboard:', error);
    }
}

export async function fetchOpenRequests() {

    try {
        const { data, error } = await supabase
        .from('Requests')
        .select('*')
        .eq('status', 'open')  
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            return data;
        }
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}

export function createMapWithMarker() {
    var map = L.map('map').setView([35.902405, -79.043275], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([35.902405, -79.043275]).addTo(map)
      .bindPopup('Marker Location: ' + 35.902405 + ', ' + -79.043275)
      .openPopup();
  }