from rest_framework import serializers
from .models import *


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class BookSerializer(serializers.ModelSerializer):
    author_name = AuthorSerializer(read_only=True)
    publisher_name = PublisherSerializer(read_only=True)
    category_name = CategorySerializer(read_only=True)  

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'publisher', 'category', 'published_date','author_name', 'publisher_name', 'category_name'] 

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'


class LibrarianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Librarian
        fields = '__all__'

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source="book.title", read_only=True)
    member_name = serializers.CharField(source="member.name", read_only=True)
    class Meta:
        model = Reservation
        fields = ['id', 'reservation_date',"book", "member", "book_title", "member_name"]

class ReviewSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source="book.title", read_only=True)
    member_name = serializers.CharField(source="member.name", read_only=True)
    class Meta:
        model = Review
        fields = ['id', 'book', 'member', 'rating', 'comment', 'book_title', 'member_name']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'