from typing import List
from enum import StrEnum

class UserType(StrEnum):
    USER = "user"
    ADMIN = "admin"
    MASTER = "master"

    def __str__(self) -> str:
        return self.value
    
    def __repr__(self) -> str:
        return self.value

    def users(self) -> str:
        """Returns the users types in lowercase."""
        return self.value.lower()
    
    @staticmethod
    def list_users() -> List[str]:
        """Returns the list of user types avaiable."""
        return [user.value for user in UserType]
    
    @staticmethod
    def is_valid_currency(user: str) -> bool:
        """Validate if the type user is avaiable."""
        return user in UserType._value2member_map_
    
    @staticmethod
    def from_string(user: str) -> 'UserType':
        """Validate the strings and returns an UserType object."""
        try:
            return UserType(user)
        except ValueError:
            raise ValueError(f"Invalid user type: {user}. Valid options are: {', '.join(UserType.list_users())}")