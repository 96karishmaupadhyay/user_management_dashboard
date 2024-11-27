import React from 'react'
import { getUsers ,deleteUser} from '../../API_SERVICE/api_service'
import { useEffect,useState } from 'react'
import styles from "./userList.module.css"
function UsersList() {
    const [users,setUsers]=useState([])
    const [error,setError]=useState(null)
    const userPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(users.length / userPerPage)
    const displayUsers=users.slice((currentPage - 1) * userPerPage, currentPage * userPerPage)


    const goToPage = (page) => {
        setCurrentPage(page);
    }

    const renderButton = () => {
        const buttons = []
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button key={i} onClick={() => goToPage(i)} className={styles.currentPage === i ? "currentPage" : ""}>{i}</button>
            )
        }
        return buttons
    }
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const data=await getUsers()
                setUsers(data)
                //console.log(users)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchUser()
    },[])
    
    const handleDeleteBtn = async (id) => {
            try {
                await deleteUser(id)
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
            } catch (error) {
                setError(error.message);
                }
         }
  return (
    <div>
      
        <ul className={styles.userList}>
        <h1>USER MANAGEMENT DASHBOARD</h1>
                {displayUsers.map((user) => (         
        <li className={styles.userItem}  key={user.id}>
            <span> {user.name}</span> 
            <span> {user.email}</span> 
            <button className={styles.editButton}>Edit</button>
             <button className={styles.deleteButton} onClick={() => handleDeleteBtn(user.id)}>Delete</button>
                        </li>
                    
                ))}

                <div className={styles.paginationbtn}>
                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>{"<<"}</button>
                    <button onClick={() => setCurrentPage((previousPage) => previousPage - 1)} disabled={currentPage === 1}>{"<"}</button>
                    {renderButton()}
                    <button onClick={() => setCurrentPage((previousPage) => previousPage + 1)} disabled={currentPage === totalPages}>{">"}</button>
                    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>{">>"}</button>
                </div>
            </ul>
            
    </div>
  )
}

export default UsersList
